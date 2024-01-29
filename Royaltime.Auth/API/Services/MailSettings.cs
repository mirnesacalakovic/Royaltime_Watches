using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class MailSettings
    {
        public string ApiToken { get; set; }
        public string ApiBaseUrl { get; set; }
        public string SenderEmail { get; set; }
    }
}