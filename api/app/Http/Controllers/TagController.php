<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;

class TagController extends Controller
{
    /**
     * List the all tags
     * 
     * @return Response
     */
    public function index(Request $request)
    {
        if ($request->search) {
            return Tag::withCount('clients')
                ->where('name', 'like', "%{$request->search}%")
                ->latest('id')->get();
        }
        return Tag::withCount('clients')->latest('id')->get();
    }

    /**
     * Show a tag
     * 
     * @param string $id
     * @return Response
     */
    public function show($id)
    {
        return Tag::find($id)
            ?? abort(404, "Tag not found!");
    }

    /**
     * Store a tag
     * 
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|unique:tags,name'
        ]);

        $tag = Tag::create($request->all());
        $tag = Tag::withCount('clients')->whereId($tag->id)->first();

        return response()->json($tag, 201);
    }

    /**
     * Update a tag
     * 
     * @param Request $request
     * @param string $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => "required|string|unique:tags,name,{$id},id"
        ]);

        $tag = Tag::find($id)
            ?? abort(404, "Tag not found!");

        $tag->update($request->all());
        $tag = Tag::withCount('clients')->whereId($tag->id)->first();

        return response()->json($tag);
    }

    /**
     * Destroy a tag
     * 
     * @param string $id
     * @return Response
     */
    public function destroy($id)
    {
        $tag = Tag::find($id)
            ?? abort(404, "Tag not found!");

        $tag->delete();

        return response()->json($tag);
    }
}
