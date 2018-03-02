'use strict'

const Like = {
    like(token, liked_user_id, user_id) {
        let formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('user_id', 1);
        formData.append('content', this.editor.state.editorHtml);
        formData.append('category', 2);
        formData.append('tags', 'tags');
        formData.append('type', 1);
        formData.append('visit', 0);
        fetch(ADD_ARTICLE, {
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