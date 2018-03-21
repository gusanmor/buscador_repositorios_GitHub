function searcUsername() {

    var inputUser = document.getElementById("inputTextUser").value;
    document.getElementById("inputTextUser").value = "";
    var apiUserGithub = new XMLHttpRequest();
    // apiUserGithub.open("GET", inputUser+".json", true);
    apiUserGithub.open("GET", "https://api.github.com/users/"+inputUser, true);
    apiUserGithub.onload = function () {
        console.log("STATUS LOGIN");
        console.log(this);
        if (this.status == 200) {
            document.getElementById("userInfoID").innerHTML = "";
            var jsonResponse = JSON.parse(this.response);
            console.log("USER INFO");
            console.log(jsonResponse);

            var boxImgUser = document.createElement("div");
            var boxUser = document.createElement("div");
            var imgUserInfo = document.createElement("img");
            var user = document.createElement("p");
            var name = document.createElement("p");
            var bio = document.createElement("p");
            var textRep = document.createElement("p");

            imgUserInfo.setAttribute("src",jsonResponse.avatar_url);
            imgUserInfo.setAttribute("class","avatarImg");
            boxImgUser.setAttribute("class","boxImgUserCl");
            boxUser.setAttribute("class","boxUserCl");
            user.setAttribute("class","spanUICl");
            name.setAttribute("class","nameComCl");
            bio.setAttribute("class","bioCl");

            user.append(jsonResponse.login);
            name.append(jsonResponse.name);
            bio.append(jsonResponse.bio);
            boxUser.append(user, name, bio);
            boxImgUser.append(imgUserInfo,boxUser);
            textRep.append("Repositoires");

            document.getElementById("userInfoID").append(boxImgUser, textRep);
            createRepositories(jsonResponse);
        }
        else if (this.status == 404) {
            document.getElementById("userInfoID").innerHTML = "";

            var divUserError = document.createElement("div");

            divUserError.append("DOES NOT EXIST");
            divUserError.setAttribute("class","errorUsCl");

            document.getElementById("userInfoID").append(divUserError);
        }
        else {
            alert("UNKNOWN ERROR");
        }
    }
    apiUserGithub.send();
}

function createRepositories(jsonRespP){

    var apiUserGithubReps = new XMLHttpRequest();
    apiUserGithubReps.open("GET", jsonRespP.repos_url, true);
    apiUserGithubReps.onload = function () {
        var jsonRepos = JSON.parse(this.response);
        console.log("USER REPOSITORIES");
        console.log(jsonRepos);

        for (var i=0; i<jsonRepos.length; i++) {
            var boxRepoNameAndStars = document.createElement("div");
            var repoName = document.createElement("a");
            var repoStars = document.createElement("span");
            boxRepoNameAndStars.setAttribute("class","starsCl");
            repoName.setAttribute("href",jsonRepos[i].html_url);
            repoName.append(jsonRepos[i].name);
            repoStars.append("★" + jsonRepos[i].stargazers_count + " F" + jsonRepos[i].forks);
            boxRepoNameAndStars.append(repoName,repoStars);

            document.getElementById("userInfoID").append(boxRepoNameAndStars);
        }
    }
    apiUserGithubReps.send();
}