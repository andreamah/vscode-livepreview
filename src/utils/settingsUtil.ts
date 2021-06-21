import * as vscode from 'vscode';
import { GO_TO_SETTINGS } from './constants';

export interface LiveServerConfigItem {
	portNum: number;
	showStatusBarItem: boolean;
	showServerStatusPopUps: boolean;
	autoRefreshPreview: AutoRefreshPreview;
	browserPreviewLaunchServerLogging: boolean;
	openPreviewTarget: OpenPreviewTarget;
	serverKeepAliveAfterEmbeddedPreviewClose: number;
	notifyOnOpenLooseFile: boolean;
}

export enum AutoRefreshPreview {
	onAnyChange = 'On All Changes in Editor',
	onSave = 'On Changes to Saved Files',
	never = 'Never',
}

export enum OpenPreviewTarget {
	embeddedPreview = 'Embedded Preview',
	externalBrowser = 'External Browser',
}

export const SETTINGS_SECTION_ID = 'LiveServer';

export const Settings: any = {
	portNum: 'portNum',
	showStatusBarItem: 'showStatusBarItem',
	showServerStatusPopUps: 'showServerStatusPopUps',
	autoRefreshPreview: 'autoRefreshPreview',
	browserPreviewLaunchServerLogging: 'browserPreviewLaunchServerLogging',
	openPreviewTarget: 'openPreviewTarget',
	serverKeepAliveAfterEmbeddedPreviewClose:
		'serverKeepAliveAfterEmbeddedPreviewClose',
	notifyOnOpenLooseFile: 'notifyOnOpenLooseFile',
};
export const PreviewType: any = {
	internalPreview: 'internalPreview',
	externalPreview: 'externalPreview',
};
export class SettingUtil {
	public static GetConfig(resource: vscode.Uri): LiveServerConfigItem {
		const config = vscode.workspace.getConfiguration(
			SETTINGS_SECTION_ID,
			resource
		);
		return {
			portNum: config.get<number>('portNum', 3000),
			showStatusBarItem: config.get<boolean>('showStatusBarItem', true),
			showServerStatusPopUps: config.get<boolean>(
				Settings.showServerStatusPopUps,
				false
			),
			autoRefreshPreview: config.get<AutoRefreshPreview>(
				Settings.autoRefreshPreview,
				AutoRefreshPreview.onAnyChange
			),
			browserPreviewLaunchServerLogging: config.get<boolean>(
				Settings.browserPreviewLaunchServerLogging,
				true
			),
			openPreviewTarget: config.get<OpenPreviewTarget>(
				Settings.openPreviewTarget,
				OpenPreviewTarget.embeddedPreview
			),
			serverKeepAliveAfterEmbeddedPreviewClose: config.get<number>(
				Settings.serverKeepAliveAfterEmbeddedPreviewClose,
				20
			),
			notifyOnOpenLooseFile: config.get<boolean>(
				Settings.notifyOnOpenLooseFile,
				true
			),
		};
	}
	public static GetPreviewType(extensionUri: vscode.Uri): string {
		if (
			SettingUtil.GetConfig(extensionUri).openPreviewTarget ==
			OpenPreviewTarget.embeddedPreview
		) {
			return PreviewType.internalPreview;
		} else {
			return PreviewType.externalPreview;
		}
	}

	public static UpdateSettings<T>(
		settingSuffix: string,
		value: T,
		isGlobal = true
	): void {
		vscode.workspace
			.getConfiguration(SETTINGS_SECTION_ID)
			.update(settingSuffix, value, isGlobal);
		SettingUtil.SettingsSavedMessage();
	}

	public static SettingsSavedMessage(): void {
		vscode.window
			.showInformationMessage(
				'Your selection has been saved in settings.',
				GO_TO_SETTINGS
			)
			.then((selection: vscode.MessageItem | undefined) => {
				if (selection === GO_TO_SETTINGS) {
					vscode.commands.executeCommand(
						'workbench.action.openSettings',
						SETTINGS_SECTION_ID
					);
				}
			});
	}


}








