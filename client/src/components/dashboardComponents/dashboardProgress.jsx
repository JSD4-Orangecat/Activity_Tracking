import '../../assets/styles/dashboardCSS/dashboardProgress.css';
import { useState } from 'react';
import { useAuth } from '../../contexts/authentication';
// import image for rank
// import wooden from '/rank/rank-wooden.png'
// import stone from '/rank/rank-stone.png'
// import copper from '/rank/rank-copper.png'
// import silver from '/rank/rank-silver.png'
// import gold from '/rank/rank-gold.png'
// import diamond from '/rank/rank-diamond.png'

export default function DashboardProgress() {
    const {currentUser} = useAuth()

    const calcRank = (rank) => {
        console.log(rank)

        if (rank >= 500) {
          return diamondRank;
        } else if (rank >= 400) {
          return goldRank;
        } else if (rank >= 300) {
          return silverRank;
        } else if (rank >= 200) {
          return copperRank;
        } else if (rank >= 100) {
          return stoneRank;
        } else if (rank < 100) {
          return woodenRank;
        }
      };

    console.log(currentUser.rank)
    const rank = calcRank(currentUser?.rank)

    

    console.log(rank)

    return (
        <div className="progress-container">
            <h2 className="progress-text" id="progress-text-title">{rank.rankName}</h2>
            <div className="progress-content">
                <div className="progress-medal">
                    <img className="progress-img" id="top-medal" src={rank.rankImage} alt={`${rank.rankName} rank image`} />
                </div>
                <div className="progress-next">
                    <p className="progress-text" id="progress-text-next">{rank.nextRank}</p>
                    <div id="progress-next-container">
                        <div id="progress-next-left">
                            <div id="progress-bar-text">{currentUser.rank % 100}%</div>
                            <progress id="progress-bar" value={currentUser.rank % 100} max="100" />
                        </div>
                        {rank.nextImage && <img className="progress-img" id="bottom-medal" src={rank.nextImage} alt={`${rank.nextRank} rank image`} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

const woodenRank = {
    rankName: 'Wooden',
    rankImage: '/rank/rank-wooden.png',
    nextRank: 'Stone',
    nextImage: '/rank/rank-stone.png',
}
const stoneRank = {
    rankName: 'stone',
    rankImage: '/rank/rank-stone.png',
    nextRank: 'Next to Copper!',
    nextImage: '/rank/rank-copper.png',
}
const copperRank = {
    rankName: 'copper',
    rankImage: '/rank/rank-copper.png',
    nextRank: 'Next to Silver!',
    nextImage: '/rank/rank-silver.png',
}
const silverRank = {
    rankName: 'silver',
    rankImage: '/rank/rank-silver.png',
    nextRank: 'Next to Gold!',
    nextImage: '/rank/rank-gold.png',
}
const goldRank = {
    rankName: 'gold',
    rankImage: '/rank/rank-gold.png',
    nextRank: 'Next to Diamond!',
    nextImage: '/rank/rank-diamond.png',
}
const diamondRank = {
    rankName: 'diamond',
    rankImage: '/rank/rank-diamond.png',
    nextRank: 'Congrat! You beat our highest rank!',
}