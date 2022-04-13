import { CommandInteraction, GuildMember } from 'discord.js';
import { Command, NonSubCommandOptionData } from '@lib/types/Command';

export default class extends Command {

	description = 'Press F to pay respects.';
	options: NonSubCommandOptionData[] = [
		{
			name: 'target',
			description: 'The user to pay respects to',
			type: 'USER',
			required: false
		}
	]

	run(interaction: CommandInteraction): Promise<void> {
		const target = interaction.options.getMember('target') as GuildMember;
		const replyContent = `${interaction.user.username} paid their respects ${target ? `to ${target.user.username}` : ``}`;
		return interaction.reply({ files: [{
			attachment: `${__dirname}../../../../../assets/images/f.png`,
			name: 'pay_respects.png'
		}], content: replyContent });
	}

}
