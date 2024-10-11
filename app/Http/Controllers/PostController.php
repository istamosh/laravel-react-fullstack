<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $posts = Post::query()
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(6);
        return PostResource::collection($posts);
    }
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        // set the user_id to the authenticated user id if not provided yet
        $data['user_id'] = $data['user_id'] ?? Auth::id();

        $post = Post::query()->create($data);

        return response(new PostResource($post), 201);
    }
    public function show(Post $post)
    {
        return new PostResource($post);
    }
    public function update(StorePostRequest $request, Post $post)
    {
        $data = $request->validated();

        // disallow update if user is not the owner of the post
        if ($post->user_id !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['error' => 'You can only update your post'], 403);
        }

        $data['admin_touched'] = false;

        // check if an admin is updating the post (excluding admin's own post)
        if (Auth::user()->is_admin && $data['admin_touched'] === false && $post->user->is_admin === false) {
            $data['admin_touched'] = true;
        }

        $post->update($data);

        return new PostResource($post);
    }
    public function destroy(Post $post)
    {
        if (Auth::user()->is_admin || $post->user_id === Auth::id()) {
            $post->delete();
            return response(null, 204);
        }

        return response()->json(['error' => 'You can only delete your post'], 403);
    }
}
