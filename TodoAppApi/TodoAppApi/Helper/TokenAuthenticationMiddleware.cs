using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace TodoAppApi.Helper
{
    public class TokenAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenAuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.Request.Headers.TryGetValue("APIToken", out var extractedToken) || extractedToken != Config.ApiToken)
            {
                context.Response.StatusCode = 401; // Unauthorized
                await context.Response.WriteAsync("Invalid API Token");
                return;
            }
            await _next(context);
        }
    }
}
