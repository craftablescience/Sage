import { PVQuestion } from '@lib/types/PVQuestion';
import { BOT, DB } from '@root/config';
import { Command, NonSubCommandOptionData } from '@lib/types/Command';
import { MessageEmbed, TextChannel, CommandInteraction } from 'discord.js';
import { generateErrorEmbed } from '@root/src/lib/utils';


export default class extends Command {

	description = `Reply to a question you previously asked with ${BOT.NAME}.`;
	options: NonSubCommandOptionData[] = [
		{
			name: 'questionid',
			description: 'The ID of the question you would like to reply to',
			type: 'STRING',
			required: true
		},
		{
			name: 'response',
			description: 'What you would like to reply with',
			type: 'STRING',
			required: true
		}
	]

	async run(interaction: CommandInteraction): Promise<void> {
		const id = interaction.options.getString('questionid');
		const question: PVQuestion = await interaction.client.mongo.collection(DB.PVQ).findOne({ questionId: id });

		if (!question || question.type === 'private') {
			return interaction.reply({ embeds: [generateErrorEmbed(`Could not find an *anonymous* question with an ID of **${id}**.`)], ephemeral: true });
		}
		if (question.owner !== interaction.user.id) {
			return interaction.reply({ embeds: [generateErrorEmbed(`You are not the owner of question ID ${question.questionId}.`)], ephemeral: true });
		}

		const [, channelId] = question.messageLink.match(/\d\/(\d+)\//);
		const channel = await interaction.client.channels.fetch(channelId) as TextChannel;

		const embed = new MessageEmbed()
			.setAuthor({ name: `Anonymous responded to ${question.questionId}`, iconURL: interaction.client.user.avatarURL() })
			.setDescription(`${interaction.options.getString('response')}\n\n[Jump to question](${question.messageLink})`);

		channel.send({ embeds: [embed] });

		interaction.reply({ content: 'I\'ve forwarded your message along.', ephemeral: true });
	}

}
