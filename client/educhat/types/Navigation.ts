export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Menu: { token: string };
    SearchChat: { token: string };
    NewChat: { token: string };
    Chat: { chatId: number; token: string };
    Profile: { token: string };
    Info: undefined;
    ContentView: { chatId: number; contentId: number; contentType: 'material' | 'exercise'; token: string };
    AddContent: { chatId: number; token: string };
    ScheduleMeeting: { chatId: number; token: string };
    AddParticipant: { chatId: number; token: string };
}
