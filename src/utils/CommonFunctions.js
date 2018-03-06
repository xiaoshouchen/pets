'use strict'

const Like = {
    like(token, liked_user_id, user_id) {
        let formData = new FormData();
        formData.append('token', token);
        formData.append('user_id', user_id);
        formData.append('content', this.editor.state.editorHtml);
        formData.append('category', 2);
        formData.append('tags', 'tags');
        formData.append('type', 1);
        formData.append('visit', 0);
        fetch(`${LIKE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.navigate('Home');
            });
    },
    dislike() {

    }
}
export {Like}