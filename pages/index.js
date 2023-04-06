import MeetupList from "@/components/meetups/MeetupList"
import { meetupDataBase } from "@/components/meetups/MeetupDataBase"
import Head from "next/head"

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>React Meetup</title>
                <meta name="description" content="This is a meetup home page"/>
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

// export const getServerSideProps = async (context) => {
//     const res = context.res;
//     const req = context.req;
//     //fetch data from API
//     return {
//         props: {
//             meetups: Dummy_Meetup
//         }
//     }
// }

export const getStaticProps = async () => {
    const meetupsCollection = await meetupDataBase();
    const meetups = await meetupsCollection.find().toArray();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description,
                id: meetup._id.toString()
            }))
        },
        revalidate: 20
    }
}

export default HomePage