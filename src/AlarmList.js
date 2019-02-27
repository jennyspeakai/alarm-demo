import React, { Component } from 'react';
import ReactTable from "react-table";
import AlarmActiveIcon from './AlarmActiveIcon';
import SelectedDates from './SelectedDates';
import "./AlarmList.css"

class AlarmList extends Component {
  TheadComponent = props => null; // Makes empty header row disappear
  columns = [{
    width: 100,
    Cell: (row) => {
      return <AlarmActiveIcon alarm={row.original} toggleActiveAlarm={this.props.toggleActiveAlarm}/>
    }
  },{
    accessor: 'name',
  },{
    accessor: 'time',
    width: 200
  },{
    width: 320,
    accessor: 'dates',
    Cell: (row) => {
      return <SelectedDates alarm={row.original} toggleSelectedDates={this.props.toggleSelectedDates} />
    }
  },{
    width: 200,
    accessor: 'reoccuring',
    Cell: (row) => {
      return <div className="reoccuring-cell">
        <span>
          {row.original.reoccuring ? 'reoccuring' : ''}
        </span>
      </div>
    }
  }]

  render() {
    return (
      <div className="alarm-list">
        <ReactTable
          data={this.props.alarms}
          TheadComponent={this.TheadComponent}
          columns={this.columns}
          getTrProps={(state, row) => ({
            onClick: () => this.props.history.push(`/alarm/${row.original.id}`)
          })}
          defaultPageSize = {5}
          showPageSizeOptions = {false}
          minRows = {0} />
      </div>
    );
  }
}

export default AlarmList;
