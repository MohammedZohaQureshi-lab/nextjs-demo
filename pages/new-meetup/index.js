import NewMeetupForm from "@/components/meetups/NewMeetupForm"
import Head from "next/head"

const NewMeetupPage = () => {
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
    }
    return (
        <>
            <Head>
                <title>New  Meetup Page</title>
                <meta name="description" content="This is a page to add new meetups"/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetupPage