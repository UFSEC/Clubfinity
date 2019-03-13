import React from 'react';
import {
	StyleSheet,
	Text,
	FlatList,
	View,
} from 'react-native';
import AgendaCard from '../components/AgendaCard';

export default class AgendaContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	// Determine Events to display based on selected date
	getCurrentEvents = () => {
		const curDate = new Date();
		const dateStr = `${curDate.getFullYear()}-0${curDate.getMonth() + 1}-${curDate.getDate()}`;
		if (this.props.datePressed.length != 0) {
			curEventsArr = this.props.eventsArr.filter(event => event.date === this.props.datePressed);
		} else {
			curEventsArr = this.props.eventsArr.filter(event => event.date === dateStr);
		}
		return curEventsArr;
	}

	render() {
		let curEventsArr = this.getCurrentEvents(curEventsArr);
		return (
			<View style={style.agendaContainer}>
				{(curEventsArr.length != 0 &&
					<Text>Events happening today</Text> ) ||
					<Text>Sorry! No Events today</Text>
				}
				<FlatList
					data={curEventsArr}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) =>
						<AgendaCard data={item} />

					}
				/>
			</View>
		);
	}
}

const style = StyleSheet.create({
	agendaContainer: {
		flex: 2,
		paddingHorizontal: 10,
	},
});