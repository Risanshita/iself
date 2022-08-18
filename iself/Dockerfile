#build commond
#docker build -f ./iself/Dockerfile -t iself:latest .

#docker run iself:latest -p 3000:80
#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
expose 80
#EXPOSE 443

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

WORKDIR /src
COPY ["iself/iself.csproj", "iself/"]
COPY ["JsonFlatFileDataStore/JsonFlatFileDataStore.csproj", "JsonFlatFileDataStore/"]
RUN dotnet restore "iself/iself.csproj"
COPY . .
WORKDIR "/src/iself"

#RUN apt-get cd ClientApp
#RUN apt-get start

RUN dotnet build "iself.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "iself.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "iself.dll"]
