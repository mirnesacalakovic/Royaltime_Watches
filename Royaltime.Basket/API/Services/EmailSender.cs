using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using Newtonsoft.Json;

namespace API.Services
{
    public class EmailSender
    {
        private readonly MailSettings _mailSettings;
        private readonly HttpClient _httpClient;

        public EmailSender(IOptions<MailSettings> mailSettingsOptions, IHttpClientFactory httpClientFactory)
        {
            _mailSettings = mailSettingsOptions.Value;
            _httpClient = httpClientFactory.CreateClient("MailTrapApiClient");
        }

        public async Task<bool> SendEmailAsync(string emailTo, string subject, string htmlBody)
        {
            var apiEmail = new
            {
                From = new { Email = _mailSettings.SenderEmail, Name = _mailSettings.SenderEmail },
                To = new[] { new { Email = emailTo, Name = emailTo } },
                Subject = subject,
                Html = htmlBody
            };

            var httpResponse = await _httpClient.PostAsJsonAsync("send", JsonConvert.SerializeObject(apiEmail));

            var responseJson = await httpResponse.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseJson);

            if (response != null && response.TryGetValue("success", out object? success) && success is bool boolSuccess && boolSuccess)
            {
                return true;
            }

            return false;
        }
    }
}