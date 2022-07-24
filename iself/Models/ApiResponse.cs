namespace iself.Models
{
    public class ApiResponse
    {
        public class Response
        {
            public bool Succeeded { set; get; } = true;
            public object? Data { get; set; }
            public object? Errors { get; set; }
            public string? Message { get; set; }
        }

        public class PaginatedResponse<TRecord>
        {
            public int Skip { get; set; }
            public int Take { get; set; }
            public List<TRecord> Data { get; }

            PaginatedResponse()
            {

                Data = new List<TRecord>();
            }

            public PaginatedResponse(List<TRecord> data, int take, int skip = 0)
            {
                Data = data;
                Take = take;
                Skip = skip;
            }

        }
    }
}
