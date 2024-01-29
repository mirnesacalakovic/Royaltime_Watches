namespace Royaltime.APIGateway.Middleware
{
    public class JwtForwardingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHttpClientFactory _clientFactory;

        public JwtForwardingMiddleware(RequestDelegate next, IHttpClientFactory clientFactory)
        {
            _next = next;
            _clientFactory = clientFactory;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = context.Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];

                var client = _clientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            await _next(context);
        }
    }
}