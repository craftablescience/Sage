import { CommandInteraction, MessageEmbed } from 'discord.js';
import { Command, NonSubCommandOptionData } from '@lib/types/Command';

const MAGIC8BALL_RESPONSES = [
	'As I see it, yes.',
	'Ask again later.',
	'Better not tell you now.',
	'Cannot predict now.',
	'Concentrate and ask again.',
	'Don’t count on it.',
	'It is certain.',
	'It is decidedly so.',
	'Most likely.',
	'My reply is no.',
	'My sources say no.',
	'Outlook not so good.',
	'Outlook good.',
	'Reply hazy, try again.',
	'Signs point to yes.',
	'Very doubtful.',
	'Without a doubt.',
	'Yes.',
	'Yes – definitely.',
	'You may rely on it.'
];

export default class extends Command {

	description = `Ask the 8-ball a question and you shall get an answer.`;
	extendedHelp = `This command requires you to put a question mark ('?') at the end of your message.`;

	options: NonSubCommandOptionData[] = [
		{
			name: 'question',
			description: 'The question you want to ask',
			type: 'STRING',
			required: true
		}
	]

	run(interaction: CommandInteraction): Promise<void> {
		const question = interaction.options.getString('question');
		const response = question.length !== 0 && question[question.length - 1].endsWith('?')
			?	MAGIC8BALL_RESPONSES[Math.floor(Math.random() * MAGIC8BALL_RESPONSES.length)]
			:	'The 8-ball only responds to questions smh';
		const responseEmbed = new MessageEmbed()
			.setColor('#000000')
			.setTitle('The magic 8-ball says...')
			.setDescription(response)
			.setFooter(`${interaction.user.username} asked: ${question}`);
		return interaction.reply({ embeds: [responseEmbed], files: [{ attachment: `${__dirname}../../../../../assets/images/8-ball.png`, name: '8-ball.png' }] });
	}

}
