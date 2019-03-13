import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { card } from '../assets/styles/stylesheet';

export default class AgendaCard extends Component {
	render() {
		const data = this.props.data;
		return (
			<View style={[card.container, style.container,]}>
				<View style={style.mainSection}>
					<Text style={style.title}>{data.title}</Text>
					<Text style={card.bodyText}>{data.club}</Text>
				</View>
				<View style={style.subSection}>
					<Text style={card.agendaText}>{data.time}</Text>
					<Text style={card.agendaText}>{data.location}</Text>
				</View>

			</View>
		);
	}
}

const style = StyleSheet.create({
	title: {
		fontWeight: '500'
	},

	container: {
		flex: 1,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignSelf: 'center',
		maxHeight: 65,
		margin: 0,
	},

	mainSection: {
		flex: 4
	},

	subSection: {
		flex: 2,
		alignContent: 'flex-end'
	}
})