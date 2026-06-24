<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Psy\Util\Json;

class InquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Inquiry::latest();

        if($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        return response()->json($query->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request):JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required | string |max:100',
            'content' => 'required | string | max:1000',
            'requester' => 'required | string | max:100',
        ]);

        $inquiry = Inquiry::create($validated);
        
        return response()->json($inquiry->fresh(), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
public function update(Request $request, Inquiry $inquiry): JsonResponse
{
    // 💡 修正：in: を付けて、スペースを詰めました
    $validated = $request->validate([
        'status' => 'required|in:pending,in_progress,completed',
    ]);

    $inquiry->update($validated);
    return response()->json($inquiry);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inquiry $inquiry): JsonResponse
    {
        $inquiry->delete();

        return response()->json(null, 204);
    }
}
