from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models.game import Game


class GameRepository:
    @staticmethod
    async def list(session: AsyncSession) -> list[Game]:
        res = await session.execute(select(Game))
        return res.scalars().all()

    @staticmethod
    async def get_by_name(session: AsyncSession, name: str) -> Game | None:
        res = await session.execute(select(Game).where(Game.name == name))
        return res.scalar_one_or_none()

    @staticmethod
    async def create(session: AsyncSession, name: str, description: str | None, image: str | None = None) -> Game:
        game = Game(name=name, description=description, image=image)
        session.add(game)
        await session.flush()
        await session.refresh(game)
        return game

    @staticmethod
    async def delete(session: AsyncSession, game_id: int) -> bool:
        game = await session.get(Game, game_id)
        if not game:
            return False
        await session.delete(game)
        await session.flush()
        return True
