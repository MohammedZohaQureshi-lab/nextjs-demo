import { meetupDataBase } from '@/components/meetups/MeetupDataBase';
import { ObjectId } from 'mongodb';
import MeetupDetails from '@/components/meetups/MeetupDetails'
import { useRouter } from 'next/router'
import React from 'react'
import Head from "next/head"

const MeetupDetailPage = (props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{props.meetupsData.title}</title>
        <meta name="description" content="This is a page to show meetup details" />
      </Head>
      <MeetupDetails
        image={props.meetupsData.image}
        title={props.meetupsData.title}
        address={props.meetupsData.address}
        description={props.meetupsData.description}
      />
    </>
  )
}
export const getStaticPaths = async (params) => {
  const meetupsCollection = await meetupDataBase();
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() }
    }))
  }
}

export const getStaticProps = async (context) => {
  //fetch data for single meetup
  const meetupId = new ObjectId(context.params.meetupId);
  const meetupsCollection = await meetupDataBase();
  const selectedMeetup = await meetupsCollection.findOne({ _id: meetupId });
  return {
    props: {
      meetupsData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      }
    }
  }
}

export default MeetupDetailPage