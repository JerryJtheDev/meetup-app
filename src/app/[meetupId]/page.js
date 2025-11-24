import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";

// ISR: Revalidate every 1 seconds
export const revalidate = 1;

// Enable dynamic params fallback (equivalent to fallback: true in pages router)
export const dynamicParams = 'blocking';

async function getMeetupData(meetupId) {
  // Connect to MongoDB
  const client = await MongoClient.connect(
    "mongodb+srv://jerryjnr385_db_user:AIRDXhmHTPXTjBVN@cluster0.rhcdbga.mongodb.net/?appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    title: selectedMeetup.title,
    address: selectedMeetup.address,
    image: selectedMeetup.image,
    description: selectedMeetup.description,
  };
}

export async function generateMetadata({ params }) {
  const { meetupId } = await params;
  const meetupData = await getMeetupData(meetupId);

  return {
    title: meetupData.title,
    description: meetupData.description,
  };
}

export async function generateStaticParams() {
  // Connect to MongoDB
  const client = await MongoClient.connect(
    "mongodb+srv://jerryjnr385_db_user:AIRDXhmHTPXTjBVN@cluster0.rhcdbga.mongodb.net/?appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return meetups.map((meetup) => ({ meetupId: meetup._id.toString() }));
}

export default async function MeetupDetails({ params }) {
  const { meetupId } = await params;
  const meetupData = await getMeetupData(meetupId);

  return (
    <Fragment>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </Fragment>
  );
}
