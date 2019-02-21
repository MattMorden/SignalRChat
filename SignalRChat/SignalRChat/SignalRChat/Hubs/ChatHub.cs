using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message, string colour)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, colour);

            //await Clients.All.SendAsync("ActionEventNumber2", param1, param2);
        }
    }
}
