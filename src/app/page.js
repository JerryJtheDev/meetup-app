// "use client"
// import { useState, useEffect} from "react";
// import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import MeetupList from "@/components/meetups/MeetupList";

// ISR: Revalidate every 10 seconds (equivalent to your getStaticProps revalidate)
export const revalidate = 10;


export const metadata = {
  title: "Jerry Meetups",
  description: "Browse a huge list of highly active React meetups!",
};


async function getMeetups() {
  // Fetch from API or return dummy data
  // Connect to MongoDB
  const client = await MongoClient.connect(
    "mongodb+srv://jerryjnr385_db_user:AIRDXhmHTPXTjBVN@cluster0.rhcdbga.mongodb.net/?appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return meetups.map((meetup) => ({
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
    id: meetup._id.toString(),
  }));
}

export default async function Home() {
  // Return meetups data
  const meetups = await getMeetups();

  return (
    <Fragment>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   //fetch data from an API

// }
