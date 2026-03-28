import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Pydantic will automatically look for an environment variable named DATABASE_URL
    database_url: str = "sqlite+aiosqlite:///./opportunity_radar.db"
    secret_key: str = "super_secret_temporary_key_for_et_hackathon_12345"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440 
    anthropic_api_key: str | None = None

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def async_database_url(self) -> str:
        url = self.database_url
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+asyncpg://", 1)
        elif url.startswith("postgresql://") and "+asyncpg" not in url:
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url

settings = Settings()