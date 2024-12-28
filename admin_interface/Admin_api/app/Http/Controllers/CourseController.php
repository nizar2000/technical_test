<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function index()
    {
        return Course::all();
    }

   public function store(Request $request)
{
    try {
        $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
  
        // Create Course
        Course::create([
            'title' => $request->title,
            'image' => $imageName,
            'price' => $request->price
        ]);
  
        // Save Image in Storage folder
        Storage::disk('public')->put($imageName, file_get_contents($request->image));
  
        // Return Json Response
        return response()->json([
            'message' => "Course successfully created."
        ],200);
    } catch (\Exception $e) {
        // Return Json Response
        return response()->json([
            'message' => "Something went really wrong!"
        ],500);
    }
}

    public function show($id)
    {
        return Course::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        try {
            // Validate request
            $this->validate($request, [
                'title' => 'sometimes|string|max:255',
                'price' => 'sometimes|numeric',
                'image' => 'sometimes|image|max:2048' // Optional image validation
            ]);
    
            // Find course
            $course = Course::find($id);
            if (!$course) {
                return response()->json([
                    'message' => 'Course not found.'
                ], 404);
            }
    
            // Update fields if provided
            if ($request->has('title')) {
                $course->title = $request->title;
            }
    
            if ($request->has('price')) {
                $course->price = $request->price;
            }
    
            if ($request->hasFile('image')) {
                $storage = Storage::disk('public');
    
                // Delete old image if exists
                if ($course->image && $storage->exists($course->image)) {
                    $storage->delete($course->image);
                }
    
                // Generate a new unique image name
                $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                $course->image = $imageName;
    
                // Save new image to public storage
                $storage->put($imageName, file_get_contents($request->image));
            }
    
            // Save updated course
            $course->save();
    
            // Return success response
            return response()->json([
                'message' => 'Course successfully updated.',
                'course' => $course // Optional: return updated course data
            ], 200);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors()
            ], 422);
    
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'message' => 'Something went wrong.',
                'error' => $e->getMessage() // Optional: include error message for debugging
            ], 500);
        }
    }
    

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $storage = Storage::disk('public');

        // Check if the file exists before deleting it
        if($storage->exists($course->image))
            $storage->delete($course->image);
      
        
       
        $course->delete();
        return response()->json(null, 204);
    }
}
