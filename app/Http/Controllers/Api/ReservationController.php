<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationCollection;
use App\Http\Resources\ReservationsPublicList;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ReservationsPublicList::collection(Reservation::all());
    }

    public function listResource(){


    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {

        $reservation = new Reservation();

        $reservation->start = Carbon::parse($request->reservationRange[0])->format('Y-m-d');
        $reservation->end = Carbon::parse($request->reservationRange[1])->format('Y-m-d');
        $reservation->name = $request->name;
        $reservation->surname = $request->surname;
        $reservation->email = $request->email;
        $reservation->phone = $request->phone;
        $reservation->adult_count = $request->adultCount;
        $reservation->child_count = $request->childCount;
        $reservation->pet = $request->pet;

        $reservation->save();

        return response()->json(['message' => 'Úspěšně jste se rezervovali. V uvedeném emailu naleznete informace o Vaší rezervaci.']);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
