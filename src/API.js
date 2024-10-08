export default function API() {

    const host = false?"http://localhost:8000": ""

    async function fetchGetApi({url}) {
        try {
            const response = await fetch(host + url, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                console.error('Error fetching:', 'Network response was not ok');
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        }
    }

    async function fetchPostApi({url, data}) {
        try {
            const response = await fetch(host + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (!response.ok) {
                console.error('Error fetching:', 'Network response was not ok');
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        }
    }

    async function get_user() {
        return await fetchGetApi({url: '/get-user/'})

    }


    async function loginInit(name) {
        return await fetchPostApi({url: "/login/", data: {name: name}})
    }

    async function update(){
        return await fetchGetApi({url: "/update/"})
    }

    async function createTeams(){
        return await fetchGetApi({url: "/create-teams/"})
    }

    async function next(){
        return await fetchGetApi({url: "/next/"})
    }

    async function reset(){
        return await fetchGetApi({url: "/reset/"})
    }

    async function sendMessage(message){
        return await fetchPostApi({url: "/send-message/", data: {message: message}})
    }
    async function sendPassword(message){
        return await fetchPostApi({url: "/send-password/", data: {message: message}})
    }

    return {
        get_user,
        loginInit,
        update,
        createTeams,
        next,
        reset,
        sendMessage,
        sendPassword
    }
}
