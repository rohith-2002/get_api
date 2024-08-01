import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const octokit = new Octokit({ });

async function getUserRepos() {
    const username = $('#username').val();
    
    try {
        const response = await octokit.request('GET /users/{username}/repos', {
            username: username,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        displayRepos(response.data);
        console.log(response.data);
    } catch (error) {
        if(error.response){
            switch(error.response.status){
                case 404:
                    alert('User not found');
                    break;
                case 403:
                    alert("forbidden")
                    break;
                case 422:
                    alert('Invalid username');
                    break;
                case 500:
                    alert('Internal server error');
                    break;
                default:
                    alert('Error fetching repositories');
            }
        }
        console.error('Error fetching repositories:', error);

    }
}

function displayRepos(repos) {
    const table = $('#repos');
    table.empty();
    repos.forEach(element => {
        const tablerow = `<tr>
            <td>${element.name}</td>
            <td><a href="${element.html_url}" target="_blank">${element.html_url}</a></td>
        </tr>`;
        table.append(tablerow);
    });
}

$(document).ready(function() {
    $('#get-btn').click(function() {
        getUserRepos();
    });
});