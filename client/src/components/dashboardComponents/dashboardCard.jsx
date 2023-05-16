import Card from "../readCardComponents/readCardCard";
import '../../assets/styles/dashboardCSS/dashboardCard.css';

import biking from '/biking.png';
import running from '/running.png';
import swimming from '/swimming.png';
import cardio from '/cardio.png';

export default function DashboardCards() {

    return (
        <div className="cards-container">
            {cardMockData.map((ele) =>
                <Card key={ele.id} data={ele} />
            )}
        </div>
    );
}

const cardMockData = [
    {
        id: 1,
        title: 'This is title',
        caption: 'I wish I was a cat, no school, no work, no exercise, just meow meow meow meow meow',
        duration: '1 h 30 m',
        date: '2023-03-18',
        task: '',
        image: 'https://images.unsplash.com/photo-1501147830916-ce44a6359892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        activity: { biking }
    },
    {
        id: 2,
        title: 'keep pushing yourself',
        caption: ' meow meow meow meow meow',
        duration: '2 h 10 m',
        date: '2023-04-17',
        task: '',
        image: 'https://images.unsplash.com/photo-1621244246296-c6be56267cc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1222&q=80',
        activity: { running }
    },
    {
        id: 3,
        title: 'No time to sleep sleep sleep sleep sleep sleep sleep sleep sleeps',
        caption: 'I eat, sleep, and run',
        duration: ' 30 m',
        date: '2023-03-16',
        task: '',
        image: 'https://plus.unsplash.com/premium_photo-1680981143179-8a6cd94d2901?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
        activity: { swimming }
    },
    // {
    //     id: 4,
    //     title: 'no title to display',
    //     caption: 'last test',
    //     duration: '1 h 48 m',
    //     date: '2023-03-07',
    //     task: '',
    //     image: 'https://images.unsplash.com/photo-1557330359-ffb0deed6163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    //     activity: { cardio }
    // }
]
