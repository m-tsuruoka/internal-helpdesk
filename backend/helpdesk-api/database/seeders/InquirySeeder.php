<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InquirySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['title' => 'PC が起動しない', 'content' => '朝から電源を入れても反応がありません。', 'requester' => '山田 太郎', 'status' => 'pending'],
            ['title' => '社内 Wi-Fi に接続できない', 'content' => '昨日から急に繋がらなくなりました。', 'requester' => '鈴木 花子', 'status' => 'in_progress'],
            ['title' => 'パスワードをリセットしたい', 'content' => 'ロックアウトされてしまいました。', 'requester' => '田中 次郎', 'status' => 'completed'],
        ];

        foreach ($data as $item) {
            \App\Models\Inquiry::create($item);
        }
    }
}
