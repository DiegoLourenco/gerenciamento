<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;
use App\Tag;

class ClientController extends Controller
{
    /**
     * List the all clients
     * 
     * @return Response
     */
    public function index(Request $request)
    {
        if ($request->search) {
            return Client::with('tags')
                ->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%")
                ->orWhere('company', 'like', "%{$request->search}%")
                ->latest('id')->get();
        }
        return Client::with('tags')->latest('id')->get();
    }

    /**
     * Show a client
     * 
     * @param string $id
     * @return Response
     */
    public function show($id)
    {
        return Client::with('tags')->find($id)
            ?? abort(404, "Client not found!");
    }

    /**
     * Store a client
     * 
     * @param \Illuminate\Http\Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:clients,email',
            'company' => 'required|string',
            'tags' => 'required|array'
        ]);

        $client = Client::create($request->all());

        $tags = Tag::whereIn('name', $request->tags)->pluck('id');
        $client->tags()->attach($tags);
        $client->load('tags');

        return response()->json($client, 201);
    }

    /**
     * Update a client
     * 
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => "required|email|unique:clients,email,{$id},id",
            'company' => 'required|string'
        ]);

        $client = Client::find($id)
            ?? abort(404, "Client not found!");

        $client->update($request->all());
        $client->load("tags");

        return response()->json($client);
    }

    /**
     * Destroy a client
     * 
     * @param string $id
     * @return Response
     */
    public function destroy($id)
    {
        $client = Client::find($id)
            ?? abort(404, "Client not found!");

        $client->delete();

        return response()->json($client);
    }
}
