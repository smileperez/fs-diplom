<?php

namespace App\Http\Controllers;

use App\Http\Requests\SeatsStoreRequest;
use App\Http\Requests\SeatsUpdateRequest;
use App\Http\Resources\SeatsResource;
use App\Models\Seats;

class SeatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SeatsResource::collection(
            Seats::orderBy('id', 'desc')
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SeatsStoreRequest $request)
    {
        $data = $request->all();

        // Получаем массив из мест кинозала и разбираем его
        if (is_array($data)) {
            foreach ($data as $item) {
                $seat = Seats::create($item);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Seats $seat)
    {
        return new SeatsResource($seat);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SeatsUpdateRequest $request, Seats $seat)
    {
        $data = $request->validated();

        $seat->update($data);

        return new SeatsResource($seat);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seats $seat)
    {
        $seat->delete();
        return response('', 204);
    }
}
