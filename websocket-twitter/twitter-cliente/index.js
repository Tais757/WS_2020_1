const socket = io('http://localhost:3000');

const mostrarTweet = tweet => {
    console.log(tweet);
    const { text, extended_tweet, retweeted_status, user } = tweet;

    let texto = '';
    if(retweeted_status) {
        texto = retweeted_status.extended_tweet 
            ? retweeted_status.extended_tweet.full_text
            : text;
    } else {
        texto = extended_tweet ? extended_tweet.full_text : text;
    }
    
    const novoTweet = `
        <div class="tweet">
            <img src="${user.profile_image_url}" alt="Thumb usuário">
            <span><b>${user.screen_name}:</b> ${texto}</span>
        </div>
    `;

    $('#tweets').append(novoTweet);
}

socket.on('tweet', tweet => mostrarTweet(tweet));