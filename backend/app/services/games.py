from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from ..repositories.games import GameRepository
from ..schemas.game import GameCreate
from ..models.game import Game


class GameService:
    @staticmethod
    async def delete_game(session: AsyncSession, game_id: int) -> bool:
        deleted = await GameRepository.delete(session, game_id)
        if deleted:
            await session.commit()
        return deleted
    @staticmethod
    async def list_games(session: AsyncSession) -> list[Game]:
        return await GameRepository.list(session)

    @staticmethod
    async def create_game(session: AsyncSession, payload: GameCreate) -> Game:
        exists = await GameRepository.get_by_name(session, payload.name)
        if exists:
            raise HTTPException(status_code=409, detail="Game already exists")
        game = await GameRepository.create(session, payload.name, payload.description, payload.image)
        await session.commit()
        return game
