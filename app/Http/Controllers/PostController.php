<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::query()->orderBy('created_at', 'desc')->paginate(6);
        return PostResource::collection($posts);
    }
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

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

        $post->update($data);

        return new PostResource($post);
    }
    public function destroy(Post $post)
    {
        // only logged in user can delete their own post, otherwise return json 403
        if ($post->user_id !== Auth::id()) {
            return response()->json(['error' => 'You can only delete your post'], 403);
        }

        $post->delete();

        return response(null, 204);
    }
}
