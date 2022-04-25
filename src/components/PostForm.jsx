import React from "react";
import { connect } from "react-redux";
import { createPost, showAlert } from "../redux/actions";
import { Alert } from "./Alert";

class PostForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
    }

    submitHandler = e => {
        e.preventDefault()

        const { title } = this.state

        if (!title.trim()) {
            return this.props.showAlert('Название поста не может быть пустым')
        }

        const newPost = {
            title,
            id: Date.now().toString()
        }
        this.props.createPost(newPost)
        this.setState({ title: '' })
    }

    changeInputHandler = e => {
        this.setState(prev => ({
            ...prev, ...{
                [e.target.name]: e.target.value
            }
        }))
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>

                {this.props.alert && <Alert text={this.props.alert} />}

                <div class="form-group">
                    <label for="title" class="form-label">Заголовок поста</label>
                    <input
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="создать будущий пост"
                        value={this.state.title}
                        name="title"
                        onChange={this.changeInputHandler}
                    />
                    <button type="submit" class="btn btn-success mt-3">Создать</button>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = {
    createPost, showAlert
}

const mapStateToProps = state => ({
    alert: state.app.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)