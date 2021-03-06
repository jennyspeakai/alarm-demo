import React, { PureComponent } from 'react';
import ReactTable from "react-table";
import AlarmActiveIcon from './AlarmActiveIcon';
import SelectedDates from './SelectedDates';
import "./AlarmList.css"

class AlarmList extends PureComponent {
  TheadComponent = props => null; // Makes empty header row disappear
  
  // Columns of the ReactTable
  columns = [{
    width: 100,
    Cell: (row) => {
      return <AlarmActiveIcon alarm={row.original} toggleActiveAlarm={this.props.toggleActiveAlarm}/>
    }
  },{
    accessor: 'name',
    Cell: (row) => {
      const changeName = (e) => {
        const newName = e.currentTarget.innerHTML;
        this.props.updateName(newName, row.original.id);
      }
    
      const gainEditFocus = (e) => {
        e.stopPropagation();
      }
    
      const loseEditFocus = (e) => {
        if(e.key === 'Enter') {
          e.target.blur();
        }
      }
      return <div suppressContentEditableWarning={true} contentEditable={true} onClick={gainEditFocus} onBlur={changeName} onKeyDown={loseEditFocus}>{row.original.name}</div>
    }
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
      const toggleReoccuring = (e) => {
        e.stopPropagation();
        this.props.toggleReoccuring(row.original.id);
      }
      return <div className="reoccuring-cell" onClick={toggleReoccuring}>
        <span>
          {row.original.reoccuring ? 'reoccuring' : 'one time'}
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
          showPagination = {this.props.alarms.length > 0}
          minRows = {0}
          style={this.props.alarms.length < 1 ? {border: 'none'} : {}}
          noDataText = 'You currently have no alarms saved'
          loadingText = 'Loading alarms...' />
      </div>
    );
  }
}

export default AlarmList;
