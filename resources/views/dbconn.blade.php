<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel DB</title>
</head>
<body>
    <h1>
    <?php
        if (DB::connection()->getPdo()) {
            echo "Connected successfully to: " . DB::connection()->getDatabaseName();
        }
    ?>
    </h1>
</body>
</html>