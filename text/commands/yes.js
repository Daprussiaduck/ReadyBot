module.exports = {
    name: 'yes',
    alt: 'ya',
    secret: false,
    spam: false,
    description: "Contributes one (1) vote to the current gulag vote, if there is one.",
    execute(message, args, bot)
    {
        if (bot.voteActive)
        {
            //if they arent in gulag and havent voted yet
            if (!message.member.roles.cache.has(bot.gulagRoleID) && bot.gulagVoters.indexOf(message.member.id) === -1)
            {
                bot.gulagYesVotes++;
                bot.gulagVoters.push(message.member.id);

                let tempYes = bot.gulagYesVotes;
                let tempNo = bot.gulagNoVotes;

                //update vote message to display current vote tallies
                var index = bot.voteMessage.content.indexOf("\n");
                bot.voteMessage.edit(bot.voteMessage.content.substring(0, index) + '\nYes: ' + tempYes + ' No: ' + tempNo);

                if (bot.gulagYesVotes >= bot.votesNeeded)
                {
                    bot.client.things.get('textcommands').get('end').execute('auto', args, bot);
                }
            }
            else if (!message.member.roles.cache.has(bot.gulagRoleID))
            {
                message.channel.send('You already voted. Voter fraud is punishable by gulag trial. ');
            }
            else
            {
                message.channel.send('You may not vote from the gulag.');
            }
        }
        else
        {
            message.channel.send('There is no active trial. ');
        }
    }
}  