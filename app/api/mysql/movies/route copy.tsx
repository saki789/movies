import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/app/sharedCode/common'; // Adjust the path as necessary

// Populate the connection parameters
const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    const connection = await mysql.createConnection(connectionParams);

    let query: string;
    let values: (number | string)[] = []; // Explicitly typing the array

    if (id) {
      query = 'SELECT * FROM movies WHERE id = ?';
      values = [id];
    } else {
      query = 'SELECT * FROM movies';
    }

    const [results] = await connection.execute(query, values);

    await connection.end();

    return NextResponse.json(results);
  } catch (err) {
    console.error('ERROR: GET - ', (err as Error).message);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const data = await request.json();
    console.log('Received data for POST:', data);

    // Connect to the database
    const connection = await mysql.createConnection(connectionParams);

    // Define the SQL query and values
    const post_query = 'INSERT INTO movies (title, overview, poster_path, trailer_url, full_movie_url, release_date, vote_average) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [data.title, data.overview, data.poster_path, data.trailer_url || null, data.full_movie_url || null, data.release_date, data.vote_average];

    // Execute the query
    const [result] = await connection.execute(post_query, values);
    console.log('Database insert result:', result);

    // Close the connection
    await connection.end();

    // Return the result
    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error('ERROR: POST - ', (err as Error).message);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop(); // Extract ID from URL

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'ID parameter is missing or invalid' }, { status: 400 });
    }

    const connection = await mysql.createConnection(connectionParams);
    const delete_query = 'DELETE FROM movies WHERE id = ?';
    const [result] = await connection.execute(delete_query, [id]);

    await connection.end();
    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error('ERROR: DELETE - ', (err as Error).message);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}