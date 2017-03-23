import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import NumberInput from 'material-ui-number-input';
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
require('rc-pagination/assets/index.css');

const Pagination = require('rc-pagination');
export default class ViewCourse extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle =  this.handleToggle.bind(this);
        this.state = {
            open: true,
            pagedCourses : [],
            curCourse:{}
        };
        this.setCourseName = this.setCourseName.bind(this)
        this.onError = (error) => {
            let errorText;
            console.log(error);
            switch (error) {
                case 'required':
                    errorText = 'This field is required';
                    break;
                case 'invalidSymbol':
                    errorText = 'You are trying to enter none number symbol';
                    break;
                case 'incompleteNumber':
                    errorText = 'Number is incomplete';
                    break;
                case 'singleMinus':
                    errorText = 'Minus can be use only for negativity';
                    break;
                case 'singleFloatingPoint':
                    errorText = 'There is already a floating point';
                    break;
                case 'singleZero':
                    errorText = 'Floating point is expected';
                    break;
                case 'min':
                    errorText = 'You are trying to enter number less than -10';
                    break;
                case 'max':
                    errorText = 'You are trying to enter number greater than 12';
                    break;
            }
            this.setState({ errorText: errorText });
        };
    }
    handleDeleteOpen = (index,data) => {
        this.setState({
            curCourse : data
        })
        this.setState({deleteDialog: true});
    };
    handleDeleteClose = () => {
        this.setState({deleteDialog: false});
    };
    handleDeleteCloseWithUpdate = () => {
        let data = this.state.curCourse
        axios.put('http://localhost:3166/api/course/deleteCourse',data).then((response)=>{
            let course = this.state.course
            for(let index in course){
                if(course[index].id==data.id){
                    course.splice(index,1)
                }
            }
            this.setState({
                course : course
            })
            let size= this.state.course
            this.setState({
                totalPages:size
            })
            course = this.state.course
            this.setState({
                currentPage : 1
            })
            this.setState({
                snackbarOpen:true,
                snackbarMessage:"Course Deleted"
            })
            let pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            this.setState({
                pagedCourses:pagedCourses
            })
        })
            .catch((response)=>{
                console.log(response)
            })
        this.setState({deleteDialog: false});
    };
    handleClose = (key) => {
        this.setState({open: false});

    };
    handleCloseWithEdit = (key) => {
        this.setState({open: false});
        let data = this.state.curCourse
        axios.put('http://localhost:3166/api/course/editCourse',data).then((response)=>{
            let course = this.state.course
            for(let index in course){
                if(course[index].id===data.id){
                    course[index] = data
                }
            }
            this.setState({
            })
            let size = course.length
            // let totalPages = Math.floor(size/10) +1
            this.setState({
                totalPages:size
            })
            this.setState({
                currentPage:1
            })
            let pagedCourses = []
            for(let index in course){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            this.setState({
                pagedCourses:pagedCourses
            })
            this.setState({
                snackbarMessage:"Field Edited Successfully",
                snackbarOpen:true
            })


        })
            .catch((response)=>{
                console.log(response)
            })
    };
    handleOpen = (key,data) => {
        this.setState({open: true});
        this.setState({
            curCourse : data
        })
    };
    handleToggle(){
        this.setState({open: !this.state.open});
    }
    setCourseName(event){
        let course = this.state.curCourse
        let name = event.target.value
        if(name.trim()=='') {
            this.setState({
                errorText1:"Course Name required"
            })
            this.setState({
                validateCourseName:false
            })
        }
        else if(name.length>20){
            this.setState({
                errorText1:"Length Should be less than 20 characters "
            })

            this.setState({
                validateCourseName:false
            })
        }
        else {
            this.setState({
                errorText1:""
            })
            this.setState({
                validateCourseName:true
            })
        }
        this.setState({
            curCourse:{
                id : course.id,
                name : event.target.value ,
                duration :course.duration,
                noOfDept : course.noOfDept
            }
        })
    }
    componentWillMount(){

        axios.get('http://localhost:3166/api/course/getCourses').then((response)=>{
            this.setState({
                course:response.data
            })
            let course = response.data
            let size = course.length
            // let totalPages = Math.floor(size /10 )+1
            this.setState({
                totalPages : size
            })
            let pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            this.setState({
                pagedCourses:pagedCourses
            })

        })
            .catch((response)=>{
                console.log(response)
            })
    }
    render(){
        const dialogActions = [
            <FlatButton
                label="No"
                primary={true}
                onTouchTap={this.handleDeleteClose}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onTouchTap={this.handleDeleteCloseWithUpdate}
            />,
        ];
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={!(this.state.validateCourseDuration && this.state.validateCourseName)}
                onTouchTap={this.handleCloseWithEdit}
            />
        ];
        const {state, onChange, onError,onError1, onKeyDown, onValid, onRequestValue} = this;
        const contentStyle = {
            marginLeft: 70 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)'
        };
        if (this.state.open) {
            contentStyle.marginLeft = 230;
        }
        return (

            <div>
                <Dialog
                    title="Edit Course"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <TextField
                        hintText="Course Name"
                        value = {this.state.curCourse.name}
                        onChange={this.setCourseName}
                        errorText={this.state.errorText1}
                    /><br />
                    <NumberInput
                        id="num"
                        hintText="Duration"
                        value={this.state.curCourse.duration}
                        required
                        strategy="warn"
                        errorText={this.state.errorText}
                        onValid={onValid}
                        onChange={this.setCourseDuration}
                        onError={onError}
                        onRequestValue={onRequestValue} />
                    <br />
                </Dialog>
                <div>
                    <h2 className="headline">Courses</h2>
                    <Table>
                        <TableHeader adjustForCheckbox={false}>
                            <TableRow >
                                <TableHeaderColumn>Course_Name</TableHeaderColumn>
                                <TableHeaderColumn>Course_Duration</TableHeaderColumn>
                                <TableHeaderColumn>No of Department</TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.state.pagedCourses.map((data,index)=>{
                                    return (
                                        <TableRow>
                                            <TableRowColumn><FlatButton label={data.name}/></TableRowColumn>
                                            <TableRowColumn>{data.duration}</TableRowColumn>
                                            <TableRowColumn>{data.noOfDept}</TableRowColumn>
                                            <TableRowColumn><FlatButton primary={true}  onTouchTap={(key)=>this.handleOpen(index,data)} label="Edit"/></TableRowColumn>
                                            <TableRowColumn><FlatButton secondary={true}  onTouchTap={(key)=>this.handleDeleteOpen(index,data)} label="Delete"/></TableRowColumn>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
                <Pagination className="ant-pagination" defaultCurrent={1} total={this.state.totalPages} current={this.state.currentPage} defaultPageSize={10} onChange={this.pageChange}/>
                {/*Confirm delete option*/}
                <Dialog
                    actions={dialogActions}
                    modal={false}
                    open={this.state.deleteDialog}
                    onRequestClose={this.handleDeleteClose}
                >
                    Are you sure you want to delete ?
                </Dialog>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.snackbarHandleRequestClose}
                />
            </div>
        );
    }
}










