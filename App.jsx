import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Button from 'react-bootstrap/lib/Button';
import DayPicker, { DateUtils } from "react-day-picker";

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

function getMonday(day) {
	var date = new Date(day);
	switch(day.getDay()) {
		case 0:
			return addDays(date, -6);
		case 1:
			return (date);
		case 2:
			return addDays(date, -1);
		case 3:
			return addDays(date, -2);
		case 4:
			return addDays(date, -3);
		case 5:
			return addDays(date, -4);
		case 6:
			return addDays(date, -5);
		default:
			break;
	}
}

function getTuesday(day) {
	var date = new Date(day);
	switch(day.getDay()) {
		case 0:
			return addDays(date, -5);
		case 1:
			return addDays(date, 1);
		case 2:
			return (date);
		case 3:
			return addDays(date, -1);
		case 4:
			return addDays(date, -2);
		case 5:
			return addDays(date, -3);
		case 6:
			return addDays(date, -4);
		default:
			break;
	}
}

function getWednesday(day) {
	var date = new Date(day);
	switch(day.getDay()) {
		case 0:
			return addDays(date, -4);
		case 1:
			return addDays(date, 2);
		case 2:
			return addDays(date, 1);
		case 3:
			return (date);
		case 4:
			return addDays(date, -1);
		case 5:
			return addDays(date, -2);
		case 6:
			return addDays(date, -3);
		default:
			break;
	}
}

function getThursday(day) {
	var date = new Date(day);
	switch(day.getDay()) {
		case 0:
			return addDays(date, -3);
		case 1:
			return addDays(date, 3);
		case 2:
			return addDays(date, 2);
		case 3:
			return addDays(date, 1);
		case 4:
			return (date);
		case 5:
			return addDays(date, -1);
		case 6:
			return addDays(date, -2);
		default:
			break;
	}
}

function getFriday(day) {
	var date = new Date(day);
	switch(day.getDay()) {
		case 0:
			return addDays(date, -2);
		case 1:
			return addDays(date, 4);
		case 2:
			return addDays(date, 3);
		case 3:
			return addDays(date, 2);
		case 4:
			return addDays(date, 1);
		case 5:
			return (date);
		case 6:
			return addDays(date, -1);
		default:
			break;
	}
}

function getSaturday(day) {
	var date = new Date(day);
	switch(day.getDay()) {
		case 0:
			return addDays(date, -1);
		case 1:
			return addDays(date, 5);
		case 2:
			return addDays(date, 4);
		case 3:
			return addDays(date, 3);
		case 4:
			return addDays(date, 2);
		case 5:
			return addDays(date, 1);
		case 6:
			return (date);
		default:
			break;
	}
}

function getSunday(day) {
	var date = new Date(day);
	switch(day.getDay()) {
		case 0:
			return date;
		case 1:
			return addDays(date, 6);
		case 2:
			return addDays(date, 5);
		case 3:
			return addDays(date, 4);
		case 4:
			return addDays(date, 3);
		case 5:
			return addDays(date, 2);
		case 6:
			return addDays(date, 1);
		default:
			break;
	}
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

class App extends React.Component {
	constructor() {
		super();
		var _this = this;

		var monDate = new Date(getMonday(new Date()));
		var tueDate = new Date(getTuesday(new Date()));
		var wedDate = new Date(getWednesday(new Date()));
		var thuDate = new Date(getThursday(new Date()));
		var friDate = new Date(getFriday(new Date()));
		var satDate = new Date(getSaturday(new Date()));
		var sunDate = new Date(getSunday(new Date()));
		
		this.state = {
			selectedDays: [{ "day": "Monday", "date": monDate }, { "day": "Tuesday", "date": tueDate }, { "day": "Wednesday", "date": wedDate }, { "day": "Thursday", "date": thuDate }, { "day": "Friday", "date": friDate }, { "day": "Saturday", "date": satDate }, { "day": "Sunday", "date": sunDate }],
			selectedDay: new Date(),
			data: null
		}

		$.getJSON( "data.json", function( data ) {
			_this.setState({data: data})
		});
	}
	
	handleDayClick(e, day) {
		this.setState({ selectedDay: day });
		var date = new Date(day);
		
		this.setState({selectedDays: [ { "day": "Monday", "date": new Date(getMonday(date)) },
			{ "day": "Tuesday", "date": new Date(getTuesday(date)) },
			{ "day": "Wednesday", "date": new Date(getWednesday(date)) },
			{ "day": "Thursday", "date": new Date(getThursday(date)) },
			{ "day": "Friday", "date": new Date(getFriday(date)) },
			{ "day": "Saturday", "date": new Date(getSaturday(date)) },
			{ "day": "Sunday", "date": new Date(getSunday(date)) }
		]});
	}

	render() {
		if(this.state.data == null || this.state.selectedDays == null) {
			return (
			 <div>
				
			 </div>
			);
		}
		  
		return (
			<div>
				<DayPicker
					onDayClick={ this.handleDayClick.bind(this) }
					selectedDays={ day => DateUtils.isSameDay(day, this.state.selectedDay) }
				/>
				<Table striped bordered condensed>
					<thead>
						<tr>
							<th></th>
							{this.state.data.flights.map((flight, i) => <TableHeadColumn key = {i} data = {flight} />)}
						</tr>
					</thead>
					<tbody>
						{this.state.selectedDays.map((day, i) => <TableRow key = {i} data = {this.state.data} selectedDay = {day} />)}
					</tbody>
				</Table>
			</div>
		);
	}
}

class TableHeadColumn extends React.Component {
	render() {
		var myStyle = {
			textAlign:'center'
		}
		return (
			<th style={myStyle}>
				{this.props.data.tee_time}
			</th>
		);
	}
}

class TableRow extends React.Component {
	render() {
		var date = new Date(this.props.selectedDay.date);
		return (
			<tr>
				<TableRowHead data = {this.props.selectedDay.day + " - " + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()} />
				{this.props.data.flights.map((flight, i) => <TableRowColumn key = {i} data = {flight} />)}
			</tr>
		);
	}
}

class TableRowHead extends React.Component {
	render() {
		var myStyle = {
			textAlign:'center'
		}
		return (
			<th style={myStyle}>
				{this.props.data}
			</th>
		);
	}
}

class TableRowColumn extends React.Component {
	render() {
		var myStyle = {
			background: '#FFFFFF',
			padding: 0
		}

		if(this.props.data.reserve_status != null) {
			if(this.props.data.reserve_status == 1) {
				myStyle = {
					background: '#FF0000',
					padding: 0
				}
			}
			else if(this.props.data.reserve_status == 2) {
				myStyle = {
					background: '#FFFF00',
					padding: 0
				}
			}

			return (
				<td style={myStyle}>
					<OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover title="Popover bottom"><strong>Holy guacamole!</strong><ReserveInfo data = {this.props.data.user_reservation} /></Popover>}>
						<a role='button' />
					</OverlayTrigger>
				</td>
			);
		}

		return (
			<td style={myStyle}>
				<OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover title="Popover bottom"><strong>Available for booking!</strong> Available!!! <a>Book Now</a></Popover>}>
					<a role='button' />
				</OverlayTrigger>
			</td>
		);
	}
}

class ReserveInfo extends React.Component {
	render() {
		return (
			<div>
				<table>
					<tr>
						<td>Name</td>
						<td>{this.props.data.user.name}</td>
					</tr>
					<tr>
						<td>{this.props.data.count_pax} Person(s)</td>
						<td>{this.props.data.actual_pax}</td>
					</tr>
					<tr>
						<td>{this.props.data.count_buggy} Buggy(s)</td>
						<td>{this.props.data.actual_buggy}</td>
					</tr>
					<tr>
						<td>{this.props.data.count_caddy} Caddy(s)</td>
						<td>{this.props.data.actual_caddy}</td>
					</tr>
					<tr>
						<td>{this.props.data.count_insurance} Insurance(s)</td>
						<td>{this.props.data.actual_insurance}</td>
					</tr>
					<tr>
						<td>Total</td>
						<td>{this.props.data.actual_pax+this.props.data.actual_buggy+this.props.data.actual_caddy+this.props.data.actual_insurance}</td>
					</tr>
				</table>
			</div>
		);
	}
}

export default App;