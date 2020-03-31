import React from 'react';
import { FlatList, StyleSheet, Text, View, } from 'react-native';
import AgendaCard from '../components/AgendaCard';

export default class AgendaContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	// Determine Events to display based on selected date
	getEventsForSelectedDate() {
    return this.props.events.filter(e => this.dateIsEqual(e.date, this.props.selectedDate));
	};

	dateIsEqual(first, second) {
	  return first.year === second.year &&
           first.month === second.month &&
           first.day === second.day;
  }

	render() {
    const selectedEvents = this.getEventsForSelectedDate();

		return (
			<View style={style.agendaContainer}>
				{(selectedEvents.length !== 0 &&
					<Text style={style.agendaSubheading}>Events happening today</Text> ) ||
					<Text style={style.agendaSubheading}>Sorry! No Events today</Text>
				}
				<FlatList
					data={selectedEvents}
					keyExtractor={(item) => item._id.toString()}
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
		marginTop: 20,
		flex: 2,
		paddingHorizontal: 10,
	},

	agendaSubheading: {
		marginTop: 10,
	}
});
