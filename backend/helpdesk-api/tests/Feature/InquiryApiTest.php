<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InquiryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_認証なしで問い合わせ一覧にアクセスすると_401(): void
    {
        $response = $this->getJson('/api/inquiries');
        $response->assertStatus(401);
    }

    public function test_認証ありで問い合わせ一覧を取得できる(): void
    {
        $user = User::create([
            'name' => 'ユーザー', 'email' => 'u@example.com', 'password' => 'password123',
        ]);

        $response = $this->actingAs($user)->getJson('/api/inquiries');

        $response->assertStatus(200)
                 ->assertJsonIsArray();
    }

    public function test_一般ユーザーは問い合わせを削除できない(): void
    {
        $user = User::create([
            'name' => '一般', 'email' => 'u@example.com', 'password' => 'password123',
        ]);
        $inquiry = Inquiry::create([
            'title' => 'テスト', 'content' => '内容', 'requester' => '担当者',
        ]);

        $response = $this->actingAs($user)->deleteJson("/api/inquiries/{$inquiry->id}");

        $response->assertStatus(403);
    }

    public function test_管理者は問い合わせを削除できる(): void
    {
        $admin = User::create([
            'name' => '管理者', 'email' => 'a@example.com', 'password' => 'password123',
        ]);
        $admin->is_admin = true;  // is_admin は fillable に入れていないので明示的に代入
        $admin->save();
        $inquiry = Inquiry::create([
            'title' => 'テスト', 'content' => '内容', 'requester' => '担当者',
        ]);

        $response = $this->actingAs($admin)->deleteJson("/api/inquiries/{$inquiry->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('inquiries', ['id' => $inquiry->id]);
    }
}