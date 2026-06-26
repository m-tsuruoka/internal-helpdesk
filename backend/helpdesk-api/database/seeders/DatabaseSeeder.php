<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::create([
            'name'     => '管理者',
            'email'    => 'admin@example.com',
            'password' => 'password123',
        ]);
        $admin->is_admin = true;
        $admin->save();

        // 一般ユーザー（is_admin は DB デフォルトの false のまま）
        User::create([
            'name'     => '一般ユーザー',
            'email'    => 'user@example.com',
            'password' => 'password123',
        ]);
    }
}
