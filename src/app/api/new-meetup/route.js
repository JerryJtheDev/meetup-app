import { MongoClient } from "mongodb";

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, image, address, description } = data;

    // Validate data
    if (!title || !image || !address || !description) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(
      "mongodb+srv://jerryjnr385_db_user:AIRDXhmHTPXTjBVN@cluster0.rhcdbga.mongodb.net/?appName=Cluster0"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    // Insert the meetup
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    // Close connection
    client.close();

    return Response.json(
      { message: "Meetup created successfully", meetupId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
