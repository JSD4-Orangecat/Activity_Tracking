import '../../assets/styles/dashboardCSS/dashboardCard.css';

export default function DashboardCards() {

    return (
        <div className="cards-container">
            {cardsMockData.map((card, index) => (
                <div key={index} className="card-image">
                    <img src={card.cardImg} alt="Profile" />
                </div>
            ))}
        </div>
    );
}

const cardsMockData = [
    {
        cardImg: '/head-logo.png',
    },
    {
        cardImg: '/head-logo.png',
    },
    {
        cardImg: '/head-logo.png',
    },
    {
        cardImg: '/head-logo.png',
    },
    {
        cardImg: '/head-logo.png',
    },
    {
        cardImg: '/head-logo.png',
    },
];
