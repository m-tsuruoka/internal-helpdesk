<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_ユーザー登録ができる(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name'                  => 'テストユーザー',
            'email'                 => 'test@example.com',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['user' => ['id', 'name', 'email'], 'token']);
    }

    public function test_正しい認証情報でログインできる(): void
    {
        User::create([
            'name'     => 'テストユーザー',
            'email'    => 'test@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email'    => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['user', 'token']);
    }

    public function test_間違ったパスワードでログインできない(): void
    {
        User::create([
            'name'     => 'テストユーザー',
            'email'    => 'test@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email'    => 'test@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(422);
    }

    public function test_トークンなしで_me_にアクセスすると_401(): void
    {
        $response = $this->getJson('/api/auth/me');
        $response->assertStatus(401);
    }

    public function test_トークンありで_me_にアクセスするとユーザー情報が返る(): void
    {
        $user = User::create([
            'name'     => 'テストユーザー',
            'email'    => 'test@example.com',
            'password' => 'password123',
        ]);

        $response = $this->actingAs($user)->getJson('/api/auth/me');

        $response->assertStatus(200)
                 ->assertJson(['email' => 'test@example.com']);
    }
}