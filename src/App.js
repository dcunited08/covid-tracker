'use strict';

class CovidTrackingRepo {
    getData() {
        return fetch("https://covidtracking.com/api/v1/states/daily.json", {
            headers: {
                Accept: "application/json",
            }
        })
            .then((rtn) => {
                return rtn.json();
            })
            .then((rtn) => {
                return rtn.filter((item) => {
                    return (item.state == "GA");
                });
            });
    }
}

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }

    componentDidMount() {
        let c = new CovidTrackingRepo();
        c.getData()
            .then((rtn) => {
                this.setState({items: rtn});
            })
    }

    render() {

        let items = this.state.items;
        console.log(items);
        console.log(items[0]);
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Dcunited08 Covid-Tracker</h1>
                </header>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <td>Date</td>
                            <td>Deaths</td>
                            <td>hospitalizedIncrease</td>
                            <td>positiveIncrease</td>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(items).map(_item => (
                            <tr key={_item[0]}>
                                <td>{_item[1].date}</td>
                                <td>{_item[1].deathIncrease} </td>
                                <td> {_item[1].hospitalizedIncrease}</td>
                                <td> {_item[1].positiveIncrease}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <LikeButton/>,
    document.getElementById('app')
);
