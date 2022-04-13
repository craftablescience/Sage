import { CommandInteraction, GuildMember } from 'discord.js';
import { Command, NonSubCommandOptionData } from '@lib/types/Command';

export default class extends Command {

	description = 'Press X to doubt.';
	options: NonSubCommandOptionData[] = [
		{
			name: 'target',
			description: 'The user to doubt',
			type: 'USER',
			required: true
		}
	]

	run(interaction: CommandInteraction): Promise<void> {
		const target = interaction.options.getMember('target') as GuildMember;
		return interaction.reply({ files: [{
			attachment: `${__dirname}../../../../../assets/images/doubt.jpg`,
			name: 'doubt.jpg'
		}], content: `${interaction.user.username} pressed X to doubt ${target.user.username}` });
	}

}
